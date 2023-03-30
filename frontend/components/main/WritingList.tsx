import styles from '../../styles/Main.module.scss';

interface Props {
    list: {
        href: string;
        contents: {
            id: number;
            title: string;
            hits: number;
            writer: string;
        }[];
    }
}

const WritingList = ({ list }: Props) => {
    return (
        <ul className={styles.list}>
            {list.contents.map((item) => (
                <li key={item.id} className={styles.item}>
                    <div>
                        <span className={styles.title}>{item.title}</span>
                        <span className={styles.hits}>{item.hits}</span>
                    </div>
                    <span className={styles.writer}>{item.writer}</span>
                </li>
            ))}
        </ul>
    );
};

export default WritingList;
