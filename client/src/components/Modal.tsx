import React, { FunctionComponent, MouseEvent, useRef } from "react"
import styled from "./util/styled"

interface VisibleProps {
  isVisible: boolean
}

const Overlay = styled.div<VisibleProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.3);
  visibility: ${props => (props.isVisible ? "visible" : "hidden")};
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: all 0.2s;
`

const Wrapper = styled.div<{ maxWidth: string; maxHeight: string }>`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};
  transform: translateX(-50%) translateY(-50%);
  padding: 1rem;
`

const ScrollingContent = styled.div<VisibleProps>`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 3rem 1rem;
  border-radius: 0.25rem;
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
  text-align: center;
  color: ${props => props.theme.colorDark};
  transform: ${props => (props.isVisible ? "none" : "scale(0.7)")};
  transition: all 0.2s;
  overflow: auto;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  font-size: 2rem;
  color: rgba(0, 0, 0, 0.2);
`

const Modal: FunctionComponent<{
  isVisible: boolean
  close: () => void
  maxWidth?: string
  maxHeight?: string
}> = ({ isVisible, close, children, maxWidth = "22rem", maxHeight = "35rem" }) => {
  const wrapperRef = useRef<HTMLDivElement>()

  const maybeClose = (e: MouseEvent) => {
    if (wrapperRef.current && e.target instanceof Node && wrapperRef.current.contains(e.target)) {
      return
    }

    close()
  }

  return (
    <Overlay isVisible={isVisible} onClick={maybeClose}>
      <Wrapper maxWidth={maxWidth} maxHeight={maxHeight} ref={wrapperRef}>
        <ScrollingContent isVisible={isVisible}>
          <Content>
            {children ? (
              <div>
                <CloseButton type="button" onClick={close}>
                  &times;
                </CloseButton>
                {children}
              </div>
            ) : null}
          </Content>
        </ScrollingContent>
      </Wrapper>
    </Overlay>
  )
}

export default Modal
