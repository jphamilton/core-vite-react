import './Loader.css';

interface Props {
  size?: number
  overlay?: boolean;
  show: boolean;
}

export const Loader = ({ size = 5, overlay = false, show = true }: Props) => {

  if (!show) {
    return <></>;
  }

  const style: React.CSSProperties = {
    width: `${size * 25}px`
  };

  const Spinner = () => {
    return <div className='loader' style={style} />;
  };

  const Overlay = ({ children }: React.PropsWithChildren) => {
    return (
      <div className='loader-overlay'>
        <div className='loader-overlay--content'>
          {children}
        </div>
      </div>
    );
  }

  return overlay ? <Overlay><Spinner /></Overlay> : <Spinner />;
}