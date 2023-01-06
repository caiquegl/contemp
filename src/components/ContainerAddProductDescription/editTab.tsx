import {
    Box,
    Text,
    Flex,
    Icon,
    Textarea,
} from "@chakra-ui/react";

import { AiFillEye } from 'react-icons/ai'
import { useState } from "react";
import { Editor } from '../EditorFile'
import dynamic from "next/dynamic";
const CustomEditor = dynamic(() => import('../CustomEditor'), { ssr: false })

const EditTab = ({ tabs, index, setTabs, editorLoaded, load }: any) => {
    const [see, setSee] = useState(false)
    let [value, setValue] = useState(tabs[index]?.text ? tabs[index]?.text : "")

    let handleInputChange = (e: any) => {
        let inputValue = e.target.value
        setValue(inputValue)
        let newList = tabs;
        newList[index].text = inputValue;
        setTabs(newList);
    }

    const [contents, setContents] = useState('')

    const handleReady = (editor: any) => {
        // console.log('onReady')
    }

    const handleChange = (event: any, editor: any) => {
        // console.log('onChange')
        const data = editor.getData()
        setContents(data)
    }

    const handleBlur = (event: any, editor: any) => {
        // console.log('onBlur')
    }

    const handleFocus = (event: any, editor: any) => {
        // console.log('onFocus')
    }

    return (
        <Box>
            <Flex alignItems="center">
                <Text color="black.800" fontSize="20px" mb="10px">
                    Conteúdo da tab
                </Text>
                <Icon ml="10px" as={AiFillEye} color="black.800" fontSize="20px" cursor="pointer" onClick={() => {
                    load()
                    setSee(!see)
                }} />
            </Flex>
            <Box color="black.800">
                {see ?
                    <Textarea value={value} onChange={handleInputChange} h="200px" />
                    :
                    <div>
                        <CustomEditor
                            name="description"
                            onChange={(evt: any) => {
                                let newList = tabs;
                                newList[index].text = evt;
                                setTabs(newList);
                            }}
                            value={tabs[index]?.text ? tabs[index]?.text : ""}
                            editorLoaded={editorLoaded}
                        />
                    </div>

                }
            </Box>
        </Box>
    );
};

export default EditTab;
