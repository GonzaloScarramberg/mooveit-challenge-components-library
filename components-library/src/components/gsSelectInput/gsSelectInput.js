import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import '../shared/globalStyles.css';
import PropTypes from 'prop-types';
import GSSelectInputItem from './gsSelectInputItem';
import { ItemsList, Arrow } from '../shared/sharedStyledComponents';
import * as Styles from './gsSelectInputStyles';
import Theme from '../themes/theme';

const GSSelectInput = ({
  isMultiSelect,
  isStyledItem,
  placeholder,
  options,
  value,
  maxHeight,
  disabled,
  onChangeValue,
}) => {
  const [isItemListVisible, setIsItemListVisible] = React.useState(false);

  const updateCheckedValue = (e) => {
    let newItemsSelected = [...value];

    if (isMultiSelect) {
      if (e.Checked) {
        newItemsSelected.push(e.Name);
      } else {
        newItemsSelected = newItemsSelected.filter((x) => x !== e.Name);
      }
    } else {
      newItemsSelected = [];
      newItemsSelected.push(e.Name);
    }

    onChangeValue(newItemsSelected);
  };

  const handleItemStyle = () => {
    if (!isStyledItem) {
      return value.map((x) => x).toString();
    }
    return value.map((x) => (
      <Styles.StyledSelectInputItem>{x}</Styles.StyledSelectInputItem>
    ));
  };

  return (
    <Theme theme={useContext(ThemeContext)}>
      <Styles.SelectInputDiv>
        <Styles.SelectInputField
          id='gsSelectInputField'
          onClick={() => setIsItemListVisible(!isItemListVisible)}
          aria-hidden='true'
        >
          <Styles.SelectInputValues
            data-testid='gsSelectInputValues'
            disabled={disabled}
          >
            {value.length !== 0 ? handleItemStyle() : `${placeholder}`}
          </Styles.SelectInputValues>
          <Styles.SelectInputIcon>
            <Arrow
              css={`
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
              `}
            />
          </Styles.SelectInputIcon>
        </Styles.SelectInputField>
        {!disabled && (
          <ItemsList maxHeight={maxHeight} visible={isItemListVisible}>
            {options.map((item) => (
              <GSSelectInputItem
                key={item}
                name={item}
                isMultiSelect={isMultiSelect}
                updateCheckStatus={(e) => {
                  updateCheckedValue(e);
                }}
              />
            ))}
          </ItemsList>
        )}
      </Styles.SelectInputDiv>
    </Theme>
  );
};

GSSelectInput.propTypes = {
  isMultiSelect: PropTypes.bool,
  isStyledItem: PropTypes.bool,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.arrayOf(PropTypes.string),
  maxHeight: PropTypes.string,
  disabled: PropTypes.bool,
  onChangeValue: PropTypes.func,
};

GSSelectInput.defaultProps = {
  isMultiSelect: false,
  isStyledItem: false,
  placeholder: 'Select an option',
  options: [],
  value: [],
  maxHeight: '200',
  disabled: false,
  onChangeValue: () => {},
};

export default GSSelectInput;
