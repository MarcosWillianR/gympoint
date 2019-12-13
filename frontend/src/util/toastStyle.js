import { toast } from 'react-toastify';
import { css } from 'glamor';

export default function(name, background, color, scroll) {
  return toast(`${name}`, {
    className: css({
      color: `${color} !important`,
      background: `${background} !important`,
      borderRadius: '6px !important',
    }),
    bodyClassName: css({
      fontSize: '14px',
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 'bold',
    }),
    progressClassName: css({
      background: `${scroll} !important`,
    }),
  });
}
