import {colors} from "../../global/colors";

export const listStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 10fr 1fr',
  alignItems: 'center',
  '&:not(:last-child)': {
    borderBottom: `solid 1px ${colors.coffeBean}`
  },
  '&:hover': {
    backgroundColor: colors.parchment
  }
}