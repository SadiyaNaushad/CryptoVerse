import { styled } from '@mui/system';

const SelectButton = ({ children, selected, onClick }) => {
  const Button = styled('span')(({ theme, selected }) => ({
    border: '1px solid gold',
    borderRadius: 5,
    padding: '10px 20px',
    fontFamily: 'Montserrat',
    cursor: 'pointer',
    backgroundColor: selected ? 'gold' : '',
    color: selected ? 'black' : '',
    fontWeight: selected ? 700 : 500,
    '&:hover': {
      backgroundColor: 'gold',
      color: 'black',
    },
    width: '22%',
    // margin: 5,
  }));

  return (
    <Button onClick={onClick} selected={selected}>
      {children}
    </Button>
  );
};

export default SelectButton;
