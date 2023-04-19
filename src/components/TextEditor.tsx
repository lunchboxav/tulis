import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";

enum BlockMode {
  Text,
  H1,
  H2,
  H3
}

interface StyledDivProps {
  enabled?: boolean;
}

interface BlockProps {
  id: number;
  mode?: BlockMode;
  initialContent?: any;
  content?: string;
}

// TODO: proper styling
const StyledParagraph = styled.p.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  background-color: #dedede;
  margin: 16px 0;
  padding: 8px;
`;

const StyledHeadingOne = styled.h1.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  font-size: 32px;
`;

const StyledHeadingTwo = styled.h2.attrs<StyledDivProps>(({ enabled }) => ({
  contentEditable: enabled || true,
  suppressContentEditableWarning: true,
}))<StyledDivProps>`
  font-size: 24px;
`;

const StyledHeadingThree = styled.h3.attrs<StyledDivProps>(({ enabled }) => ({
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
    if (ev.key == "Enter") {
      ev.preventDefault();
      addBlock(BlockMode.Text);
    }
  };

  const addBlock = (blockType: BlockMode) => {
    setBlockArr(() => [
      ...blockArr,
      { id: getMaxId() + 1, mode: blockType, initialContent: "Heading 2" },
    ]);
  };

  // TODO: make new type modifieable
  const changeBlockType = (id: number, index: number) => {
    //if (window.getSelection()?.toString() != "") {
      setBlockArr(items => {
        return items.map(item => {
          return item.id === id ? { ...item, mode: BlockMode.H1 } : item
        })
      })
    //}
  };

  const deleteBlock = (i: any) => {
    let filteredArray = blockArr.filter((item) => item.id !== i);
    setBlockArr(filteredArray);
  };

  const checkBlock = () => {
    console.log(blockArr);
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
        e.mode === BlockMode.H1 ? (
          <div key={i}>
            <StyledHeadingOne
              key={i}
              onInput={(ev: ChangeEvent<HTMLInputElement>) => handleInput(ev, i)}
              onKeyDown={(ev) => handlekeyDown(ev, e.id, i)}
            >
              {e.content}
            </StyledHeadingOne>
            {/* <div onClick={() => deleteBlock(e.id)}>del{e.id}</div> */}
          </div>
        ) : e.mode === BlockMode.H2 ? (
          <StyledHeadingTwo
            key={i}
            onInput={(ev: ChangeEvent<HTMLInputElement>) => handleInput(ev, i)}
            onKeyDown={(ev) => handlekeyDown(ev, e.id, i)}
          >
            {e.initialContent}
          </StyledHeadingTwo>
        ) : e.mode === BlockMode.H3 ? (
          <StyledHeadingThree
            key={i}
            onInput={(ev: ChangeEvent<HTMLInputElement>) => handleInput(ev, i)}
            onKeyDown={(ev) => handlekeyDown(ev, e.id, i)}
          >
            {e.initialContent}
          </StyledHeadingThree>
        ) : (
          <div>
          <StyledParagraph
            key={i}
            onInput={(ev: ChangeEvent<HTMLInputElement>) => handleInput(ev, i)}
            onKeyDown={(ev) => handlekeyDown(ev, e.id, i)}
            // onMouseUp={() => changeBlockType(e.id)}
          ></StyledParagraph><button onClick={() =>changeBlockType(e.id, i)}>change type</button>
          </div>
        )
      )}
      <button onClick={() => addBlock(BlockMode.H1)}>Add Heading 1</button>
      <button onClick={() => addBlock(BlockMode.H2)}>Add Heading 2</button>
      <button onClick={() => addBlock(BlockMode.H3)}>Add Heading 3</button>
      <button onClick={() => addBlock(BlockMode.Text)}>Add Text</button>
      <button onClick={checkBlock}>Check Block</button>
    </MainDiv>
  );
};

export default TextEditor;
