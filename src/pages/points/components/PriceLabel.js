/**
 * Created by zhulizhe on 2018/11/17.
 */
import styles from './page.css';

export const PriceLabel = ({price,color,prefix='¥',suffix=''})=>{
  return <div className={styles.price_label}>
    <div className={styles.prefix}>{prefix}</div>
    <div className={styles.p_price}>{price}</div>
    <div className={styles.suffix}>{suffix}</div>
  </div>
}
