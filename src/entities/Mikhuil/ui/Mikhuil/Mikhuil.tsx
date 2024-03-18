import cn from 'classnames';
import styles from 'Mikhuil.module.scss'

interface MikhuilProps {
  className?: string;
}

export const Mikhuil = (props: MikhuilProps) => {
  const { className } = props;

  return (
    <div className={cn(styles.mikhuil, className)}>
    
    </div>
  )
}
