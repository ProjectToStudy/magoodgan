import { useRecoilValue } from 'recoil';
import { boardItem } from '../../modules/state/board';
import styles from '../../styles/Post.module.scss';

const boardNameDict: { [key in string]: string } = {
    notice: '공지사항',
};

const dateFormatting = (date: string) => {
    if (date === '') return date;

    const split = date.split(' ')[0].split('.');
    return `${split[0]}년 ${split[1]}월 ${split[2]}일`;
};

const PostComponent = ({ board }: { board: string }) => {
    const item = useRecoilValue(boardItem);

    return (
        <main>
            <div className={styles.post}>
                <div className={styles.title_area}>
                    <span className={styles.board_name}>{boardNameDict[board]}</span>
                    <p className={styles.title}>{item.title}</p>
                </div>
                <div className={styles.writer_area}>
                    <img src="" alt="" />
                    <div>
                        <span className={styles.writer}>(nickname이 안와요)</span>
                        <span className={styles.date}>{dateFormatting(item.date)}</span>
                    </div>
                </div>
                <div
                    dangerouslySetInnerHTML={{ __html: item.content }}
                    className={styles.contents_area}
                />
            </div>
        </main>
    );
};

export default PostComponent;
