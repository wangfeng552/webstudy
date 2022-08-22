import type { FC } from 'react';
import styles from './index.less';

interface ShButtonProps {
  children: string;
  type?: string;
}

const ShButton: FC<ShButtonProps> = ({ children, type }) => {
  return (
    <button className={type === 'grey' ? styles.sh_grey : styles.sh_blue}>
      <i className={styles.dian} />
      {children}
    </button>
  );
};

export default ShButton;
