import styles from '../../../styles/Board.module.scss';

const PostItem = () => {
    return (
        <div className={styles.post_item}>
            <div className={styles.pi_top}>
                <div className={styles.pi_info}>
                    <span>카테고리</span>
                    <span>제목</span>
                    <span>작성자</span>
                </div>
                {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                <img alt="image" />
            </div>
            <div className={styles.pi_bottom}>
                <div className={styles.pi_count}>
                    <span>2,204</span>
                    <span>5</span>
                    <span>2,204</span>
                </div>
                <span>작성일</span>
            </div>
        </div>
    );
};

const PostList = () => {
    return (
        <div className={styles.post_list}>
            <PostItem />
            <PostItem />
            <PostItem />
        </div>
    );
};

export default PostList;
