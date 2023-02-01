import Title from './Title';
import styles from '../../styles/Main.module.scss';
import WritingList from './WritingList';

const dummy = {
    href: '/',
    contents: [
        {
            id: 1,
            title: '게시글1',
            hits: 128,
            writer: '김실명',
        },
        {
            id: 2,
            title: '게시글2',
            hits: 43,
            writer: '김실명',
        },
        {
            id: 3,
            title: '게시글3',
            hits: +999,
            writer: '김실명',
        },
    ],
};

const Top3WithCategory = ({ title, category }: { title?: string, category: string[] }) => {
    return (
        <div className={styles.category_board}>
            {title && <Title title={title} />}
            <ul className={styles.category}>
                {category.map((item, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={index} className={styles.category_item}>{item}</li>
                ))}
            </ul>
            <WritingList list={dummy} />
        </div>
    );
};

export default Top3WithCategory;
