import styled from "styled-components";

export const Container = styled.div`
.embla {
  position: relative;
  background-color: #f7f7f7;
  padding: 20px;
  max-width: 350px;
  margin-left: auto;
  margin-right: auto;
}

.embla__viewport {
  overflow: hidden;
  width: 500px;
}

.embla__viewport.is-draggable {
  cursor: move;
  cursor: grab;
}

.embla__viewport.is-dragging {
  cursor: grabbing;
}

.embla__container {
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -10px;
}

.embla__slide {
  position: relative;
  min-width: 50%;
  padding-left: 10px;
}

.embla__slide__inner {
  position: relative;
  overflow: hidden;
  height: 190px;
  min-width: 300px;
}

.embla__slide__img {
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  width: auto;
  min-height: 100%;
  min-width: 100%;
  max-width: none;
  transform: translate(-50%, -50%);
}

.embla__button {
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  fill: #1bcacd;
  padding: 0;
}

.embla__button:disabled {
  cursor: default;
  opacity: 0.3;
}

.embla__button__svg {
  width: 100%;
  height: 100%;
}

.embla__button--prev {
  left: 27px;
}

.embla__button--next {
  right: 27px;
}
`