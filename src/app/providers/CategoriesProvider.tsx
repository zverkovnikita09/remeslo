import { PropsWithChildren, createContext, useCallback, useMemo } from "react"
import { useQuery } from "react-query"
import { useLocation } from "react-router-dom"
import { IBreadcrumb } from "src/features/Breadcrumbs/ui/Breadcrumbs";
import { getData } from "src/shared/lib/api/api"

interface CategoriesContextProps {
    categories: ICategory[];
    currentCategories: [string, ICategory[] | ISubcategory[]] | []
    pathArray: IBreadcrumb[]
}

export interface ISubcategory extends Omit<ICategory, 'subcategories'> {
    children: ISubcategory[]
}

export interface ICategory {
    name: string
    image: string
    slug: string
    subcategories: ISubcategory[]
}

export const CategoriesContext = createContext<CategoriesContextProps>({ categories: [], currentCategories: ['', []], pathArray: [] })

export const checkCategory = (tag: ISubcategory | ICategory): tag is ICategory => {
    return (tag as ICategory).subcategories !== undefined;
}
export const CategoriesProvider = ({ children }: PropsWithChildren) => {

    const path = useLocation();
    const flatCategories = useCallback((tagsArray: ICategory[] | ISubcategory[]) => {
        if (!tagsArray.length) {
            return {}
        }
        let result: Record<string, [string, ICategory[] | ISubcategory[]]> = {};
        let stack: any[] = []
        tagsArray.forEach(node => stack.push(node));
        while (stack.length) {
            const node = stack.pop()
            let nodeChildren = checkCategory(node) ? node.subcategories : node.children;
            result[node.slug] = [node.name, nodeChildren];
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
        let paths = path.pathname.split('/');
        let filteredPath = paths.includes('tags') ? paths.slice(paths.indexOf('tags') + 1).filter(Boolean) : [];
        let flatedCategories = flatCategories(categories ?? []);
        let pathLink = '/main/tags'

        return filteredPath.map((pathItem) => {
            pathLink += `/${pathItem}`
            return { name: flatedCategories[pathItem]?.[0], link: pathLink }
        })
    }, [path, categories]);

    const currentCategories = useMemo<[string, ICategory[] | ISubcategory[]] | []>(() => {
        if (!pathArray.length) return [];

        if (pathArray.some(item => !item.name)) {
            return [];
        }


        return flatCategories(categories ?? [])[pathArray.at(-1)?.link.split('/').at(-1) ?? ''] // находим в объекте из функции flatCategories находим список категорий по ключу, равному последнему элементу pathArray
    }, [pathArray, categories]);

    return (
        <CategoriesContext.Provider value={{ categories: categories ?? [], currentCategories: currentCategories, pathArray: pathArray }}>
            {children}
        </CategoriesContext.Provider>
    )
}