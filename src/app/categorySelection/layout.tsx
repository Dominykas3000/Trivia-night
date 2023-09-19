import style from './page.module.css'

export default function CategorySelectionLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main className={style.main}>
            {children}
        </main>
    )
}
