import styled from "../util/styled"

const BackButton = styled.button`
  border: none;
  padding: 0;
  background: none;
  color: ${props => props.theme.colorPrimary}
  margin-bottom: 1rem;
  cursor: pointer;
`

export default BackButton
