type Props = {
  value: string;
  onClick: () => void;
}

function Square({ value, onClick }: Props) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
