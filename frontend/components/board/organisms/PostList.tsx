import styles from '../../../styles/Board.module.scss';
import { BoardListBody, PostItemProps } from '../../../types/board';

const PostItem = ({ category, title, nickname, date, view }: PostItemProps) => {
    return (
        <div className={styles.post_item}>
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
                    <span>5</span>
                    <span>2,204</span>
                </div>
                <span>{date}</span>
            </div>
        </div>
    );
};

const PostList = ({ category, list }: { category: string, list: BoardListBody[] }) => {
    return (
        <div className={styles.post_list}>
            {list.map((item) => (
                <PostItem
                    key={item.id}
                    category={category}
                    title={item.title}
                    nickname={item.nickname}
                    date={item.date}
                    view={item.view}
                />
            ))}
        </div>
    );
};

export default PostList;
