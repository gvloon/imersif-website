const PatternCategoryLink = ({ category, children }) => {
    return (
        <Link href="/pattern-category/[slug]" as={`/pattern-category/${category.slug}`}>
            { children }
        </Link>
    )
}

export default PatternCategoryLink
