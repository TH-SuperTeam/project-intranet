import Skeleton from "react-loading-skeleton";
import styles from "../../Education/Education.module.css";

export const EducationSkeleton = () => {
    return (
        <div className="flex flex-col gap-8" aria-hidden="true">
            {Array.from({ length: 2 }, (_, schoolIndex) => (
                <section className={styles.schoolSection} key={schoolIndex}>
                    <h2>
                        <Skeleton width={200} />
                    </h2>

                    <div className={styles.programList}>
                        {Array.from(
                            { length: schoolIndex === 0 ? 2 : 1 },
                            (_, programIndex) => (
                                <article
                                    className={styles.programCard}
                                    key={programIndex}
                                    aria-hidden="true"
                                >
                                    <div className={styles.programHeader}>
                                        <div className={styles.programIcon}>
                                            <Skeleton
                                                width={44}
                                                height={44}
                                                borderRadius={10}
                                            />
                                        </div>

                                        <div className={styles.programInfo}>
                                            <h3>
                                                <Skeleton width="90%" />
                                            </h3>

                                            <span className={styles.classCount}>
                                                <Skeleton width={65} />
                                            </span>
                                        </div>

                                        <span className={styles.activeStatus}>
                                            <Skeleton
                                                width={60}
                                                height={24}
                                                borderRadius={999}
                                            />
                                        </span>

                                        <div className={styles.rowActions}>
                                            <Skeleton
                                                width={36}
                                                height={36}
                                                borderRadius={8}
                                            />
                                            <Skeleton
                                                width={36}
                                                height={36}
                                                borderRadius={8}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.classList}>
                                        {Array.from(
                                            {
                                                length:
                                                    programIndex === 0 ? 2 : 1,
                                            },
                                            (_, classIndex) => (
                                                <div
                                                    className={styles.classRow}
                                                    key={classIndex}
                                                >
                                                    <div className="flex w-11 shrink-0 justify-center">
                                                        <Skeleton
                                                            width={18}
                                                            height={18}
                                                        />
                                                    </div>

                                                    <div
                                                        className={
                                                            styles.classInfo
                                                        }
                                                    >
                                                        <span
                                                            className={
                                                                styles.className
                                                            }
                                                        >
                                                            <Skeleton
                                                                width={55}
                                                            />
                                                        </span>

                                                        <span
                                                            className={
                                                                styles.classDates
                                                            }
                                                        >
                                                            <Skeleton width="90%" />
                                                        </span>
                                                    </div>

                                                    <span
                                                        className={
                                                            styles.activeStatus
                                                        }
                                                    >
                                                        <Skeleton
                                                            width={60}
                                                            height={24}
                                                            borderRadius={999}
                                                        />
                                                    </span>

                                                    <div
                                                        className={
                                                            styles.rowActions
                                                        }
                                                    >
                                                        <Skeleton
                                                            width={36}
                                                            height={36}
                                                            borderRadius={8}
                                                        />
                                                        <Skeleton
                                                            width={36}
                                                            height={36}
                                                            borderRadius={8}
                                                        />
                                                    </div>
                                                </div>
                                            ),
                                        )}
                                    </div>

                                    <div className={styles.programActions}>
                                        <Skeleton
                                            width={140}
                                            height={36}
                                            borderRadius={8}
                                        />
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};
