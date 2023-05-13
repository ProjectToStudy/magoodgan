import Link from 'next/link';
import { BoardListBody, PostItemProps } from '../../../types/board';
import styles from '../../../styles/Board.module.scss';

const PostItem = ({ link, category, title, nickname, date, view }: PostItemProps) => {
    return (
        <li className={styles.post_item}>
            <Link href={link}>
                <a>
                    <div className={styles.pi_top}>
                        <div className={styles.pi_info}>
                            <span>{category}</span>
                            <span>{title}</span>
                            <span>{nickname}</span>
                        </div>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img alt="image" />
                    </div>
                    <div className={styles.pi_bottom}>
                        <div className={styles.pi_count}>
                            <span>{view}</span>
                            <span>댓글 개수</span>
                            <span>추천 개수</span>
                        </div>
                        <span>{date}</span>
                    </div>
                </a>
            </Link>
        </li>
    );
};

const PostList = (
    { board, category, list }: { board: string, category: string, list: BoardListBody[] },
) => {
    return (
        <ul className={styles.post_list}>
            {list.map((item) => (
                <PostItem
                    key={item.id}
                    link={`/board/${board}/${item.id}`}
                    category={category}
                    title={item.title}
                    nickname={item.nickname}
                    date={item.date}
                    view={item.view}
                />
            ))}
        </ul>
    );
};

export default PostList;
