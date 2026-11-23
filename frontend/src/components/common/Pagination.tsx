import styles from "./Pagination.module.css";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    ariaLabel?: string;
};

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    ariaLabel = "Sidnavigering",
}: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <nav className={styles.pagination} aria-label={ariaLabel}>
            <button
                type="button"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Föregående
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPageChange(index)}
                    aria-current={currentPage === index ? "page" : undefined}
                >
                    {index + 1}
                </button>
            ))}

            <button
                type="button"
                disabled={currentPage >= totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Nästa
            </button>
        </nav>
    );
};

export default Pagination;
