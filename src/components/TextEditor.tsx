import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

interface StyledDivProps {
  enabled?: boolean;
}

interface BlockProps {
  id: number;
  mode?: string;
  initialContent?: any;
  content?: string;
}

// TODO: proper styling
const StyledDiv = styled.div.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  background-color: #dedede;
  margin: 16px 0;
  padding: 8px;
`;

const StyledHeadingOne = styled.div.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  font-size: 32px;
`;

const StyledHeadingTwo = styled.div.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  font-size: 24px;
`;

const StyledHeadingThree = styled.div.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  font-size: 20px;
`;

const MainDiv = styled.div`
  background-color: #efefef;
  width: 1000px;
  height: 1000px;
  padding: 16px;
`;

const TextEditor = (props: any) => {
  const [blockArr, setBlockArr] = useState<BlockProps[]>([]);
  const [content, setContent] = useState("");

  const handleInput = (ev: ChangeEvent<HTMLInputElement>, i: number) => {
    let newArr = [...blockArr];
    newArr[i].content = ev.target.innerHTML;
  };

  // TODO: rethink if both handleInput() and handleKeyDown() can be merged
  const handlekeyDown = (ev: KeyboardEvent, id: number, index: number) => {
    if (blockArr[index].content?.length == 0 && ev.key == "Backspace") {
      deleteBlock(id);
    }
  };

  const deleteBlock = (i: any) => {
    let filteredArray = blockArr.filter((item) => item.id !== i);
    setBlockArr(filteredArray);
  };

  const getBlockArrLength = () => blockArr.length;
  const getMaxId = () => {
    if (getBlockArrLength() == 0) {
      return 0;
    } else {
      return Math.max(...blockArr.map((item) => item.id));
    }
  };

  return (
    <MainDiv>
      {blockArr.map((e, i) =>
        e.mode === "headingOne" ? (
          <div key={i}>
            <StyledHeadingOne
              key={i}
              onInput={(ev: ChangeEvent<HTMLInputElement>) => handleInput(ev, i)}
              onKeyDown={(ev) => handlekeyDown(ev, e.id, i)}
            >
              {e.content}
            </StyledHeadingOne>
            <span onClick={() => deleteBlock(e.id)}>del{e.id}</span>
          </div>
        ) : e.mode === "headingTwo" ? (
          <StyledHeadingTwo key={i}>{e.initialContent}</StyledHeadingTwo>
        ) : e.mode === "headingThree" ? (
          <StyledHeadingThree key={i}>{e.initialContent}</StyledHeadingThree>
        ) : (
          <StyledDiv key={i}></StyledDiv>
        )
      )}
      <button
        onClick={() => {
          setBlockArr((arr) => [
            ...arr,
            { id: getMaxId() + 1, mode: "headingOne", initialContent: "Heading 1" },
          ]);
        }}
      >
        Add Heading 1
      </button>
      <button
        onClick={() => {
          setBlockArr((arr) => [
            ...arr,
            { id: getMaxId() + 1, mode: "headingTwo", initialContent: "Heading 2" },
          ]);
        }}
      >
        Add Heading 2
      </button>
      <button
        onClick={() => {
          setBlockArr((arr) => [
            ...arr,
            { id: getMaxId() + 1, mode: "headingThree", initialContent: "Heading 3" },
          ]);
        }}
      >
        Add Heading 3
      </button>
      <button
        onClick={() => {
          setBlockArr((arr) => [
            ...arr,
            { id: getBlockArrLength(), mode: "text", initialContent: "Text" },
          ]);
        }}
      >
        Add Text
      </button>
    </MainDiv>
  );
};

export default TextEditor;
