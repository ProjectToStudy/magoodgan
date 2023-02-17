import Title from './Title';
import styles from '../../styles/Main.module.scss';

const Photo = ({ title }: { title: string }) => {
    return (
        <div className={styles.photo_board}>
            <Title title={title} />
            <img src="" alt="" />
        </div>
    );
};

export default Photo;
