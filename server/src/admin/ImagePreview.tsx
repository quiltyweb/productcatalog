import { Box} from "@admin-bro/design-system";

const ImagePreview = (props) => {
  return (
    <Box variant="grey" padding="1rem">
      <img width="60px" height="60px" src={props.record.params.imageFilePath} alt={props.record.params.name} />
    </Box>
  );
};

export default ImagePreview;