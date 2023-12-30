import { PropsWithChildren, createContext, useCallback, useContext, useMemo } from "react"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { IBreadcrumb } from "src/features/Breadcrumbs/ui/Breadcrumbs";
import { getData } from "src/shared/lib/api/api"

type CategoryName = string
type Subcategories = ICategory[] | ISubcategory[]
type CategoryId = string

interface CategoriesContextProps {
    categories: ICategory[];
    currentCategory: [CategoryName, Subcategories, CategoryId] | []
    pathArray: IBreadcrumb[]
}

export interface ISubcategory extends Omit<ICategory, 'subcategories'> {
    children: ISubcategory[]
}

export interface ICategory {
    name: string
    image: string
    slug: string
    id: string
    subcategories: ISubcategory[]
}

export const CategoriesContext = createContext<CategoriesContextProps>({ categories: [], currentCategory: ['', [], ''], pathArray: [] })

export const checkCategory = (tag: ISubcategory | ICategory): tag is ICategory => {
    return (tag as ICategory).subcategories !== undefined;
}
export const CategoriesProvider = ({ children }: PropsWithChildren) => {

    const path = useLocation();
    const flatCategories = useCallback((tagsArray: ICategory[] | ISubcategory[]) => {
        if (!tagsArray.length) {
            return {}
        }
        const result: Record<string, [CategoryName, Subcategories, CategoryId]> = {};
        const stack: any[] = []
        tagsArray.forEach(node => stack.push(node));
        while (stack.length) {
            const node = stack.pop()
            const nodeChildren = checkCategory(node) ? node.subcategories : node.children;
            result[node.slug] = [node.name, nodeChildren, node.id];
            if (nodeChildren.length) {
                nodeChildren.forEach((child: any) => stack.push(child))
            }
        }
        return result
    }, []);

    const { data: categories } = useQuery({
        queryKey: 'categoriesQuery',
        queryFn: () => getData<ICategory[]>({
            url: `/api/v1/tags`,
            dataFlag: true
        }),
    })

    const pathArray = useMemo<IBreadcrumb[]>(() => {
        const paths = path.pathname.split('/');
        const filteredPath = paths.includes('tags') ? paths.slice(paths.indexOf('tags') + 1).filter(Boolean) : [];
        const flatedCategories = flatCategories(categories ?? []);
        let pathLink = '/main/tags'

        return filteredPath.map((pathItem) => {
            pathLink += `/${pathItem}`
            return { name: flatedCategories[pathItem]?.[0], link: pathLink }
        })
    }, [path, categories]);

    const currentCategory = useMemo<[CategoryName, Subcategories, CategoryId] | []>(() => {
        if (!pathArray.length) return [];

        if (pathArray.some(item => !item.name)) {
            return [];
        }

        return flatCategories(categories ?? [])[pathArray.at(-1)?.link.split('/').at(-1) ?? ''] // находим в объекте из функции flatCategories находим список категорий по ключу, равному последнему элементу pathArray
    }, [pathArray, categories]);

    return (
        <CategoriesContext.Provider value={{ categories: categories ?? [], currentCategory, pathArray }}>
            {children}
        </CategoriesContext.Provider>
    )
}

export const useCategoriesContext = () => {
    const { ...params } = useContext(CategoriesContext);

    return { ...params }
}