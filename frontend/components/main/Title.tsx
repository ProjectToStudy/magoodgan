import Link from 'next/link';
import styles from '../../styles/Main.module.scss';

interface Props {
    title: string;
}

const Title = ({ title }: Props) => {
    return (
        <div className={styles.title_area}>
            <p className={styles.title}>{title}</p>
            {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
            <Link href="/"><a /></Link>
        </div>
    );
};

export default Title;
