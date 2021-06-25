import { Box} from "@admin-bro/design-system";

const attachmentPreview = (props) => {
  console.log(props.record.params);

  return (
    <Box variant="grey" padding="xs">
      {
        props.record.params.attachmentFilePath ? <a href={props.record.params.attachmentFilePath} target="_blank">Ficha</a> : 'Sin Ficha'
      }


    </Box>
  );
};

export default attachmentPreview;