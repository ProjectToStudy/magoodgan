import styles from '../../styles/Post.module.scss';

const PostComponent = () => {
    return (
        <main>
            <div className={styles.post}>
                <div className={styles.title_area}>
                    <span className={styles.board_name}>공지사항</span>
                    <p className={styles.title}>2023 마굿간 신년회 (1.7.토 서울명동)</p>
                </div>
                <div className={styles.writer_area}>
                    <img src="" alt="" />
                    <div>
                        <span className={styles.writer}>이새봄(운영자)</span>
                        <span className={styles.date}>2022년 12월 4일</span>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default PostComponent;
