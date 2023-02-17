import Title from './Title';
import WritingList from './WritingList';
import styles from '../../styles/Main.module.scss';

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

interface Props {
    title: string;
}

const Top3 = ({ title }: Props) => {
    return (
        <div className={styles.top3}>
            <Title title={title} />
            <WritingList list={dummy} />
        </div>
    );
};

export default Top3;
