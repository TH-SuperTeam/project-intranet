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

    const getVisiblePages = (): number[] => {
        // Visa alla sidor om det finns högst 7.
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, index) => index);
        }

        // Nära början: visa de fem första och sista sidan.
        if (currentPage <= 3) {
            return [0, 1, 2, 3, 4, totalPages - 1];
        }

        // Nära slutet: visa första och de fem sista.
        if (currentPage >= totalPages - 4) {
            return [
                0,
                ...Array.from(
                    { length: 5 },
                    (_, index) => totalPages - 5 + index,
                ),
            ];
        }

        // I mitten: första, aktuell +/- 1 och sista.
        return [
            0,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            totalPages - 1,
        ];
    };

    const visiblePages = getVisiblePages();

    return (
        <nav className={styles.pagination} aria-label={ariaLabel}>
            <button
                type="button"
                disabled={currentPage === 0}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Föregående
            </button>

            {visiblePages.map((page, index) => (
                <span key={page} className={styles.pageGroup}>
                    {index > 0 && page - visiblePages[index - 1] > 1 && (
                        <span className={styles.ellipsis} aria-hidden="true">
                            …
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        aria-label={`Sida ${page + 1}`}
                    >
                        {page + 1}
                    </button>
                </span>
            ))}

            <button
                type="button"
                disabled={currentPage === totalPages - 1}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Nästa
            </button>
        </nav>
    );
};

export default Pagination;
