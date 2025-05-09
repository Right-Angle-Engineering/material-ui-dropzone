import Chip from '@mui/material/Chip';
import {styled} from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import clsx from 'clsx';
import * as React from 'react';
import PropTypes from 'prop-types';

const PREFIX = 'MuiDropzonePreviewList';

const classes = {
    root: `${PREFIX}-root`,
    imageContainer: `${PREFIX}-imageContainer`,
    image: `${PREFIX}-image`,
    removeButton: `${PREFIX}-removeButton`,
};

const StyledGrid = styled(Grid)(({
    theme: {palette, shape, spacing},
}) => ({
    [`&.${classes.root}`]: {},

    [`& .${classes.imageContainer}`]: {
        position: 'relative',
        zIndex: 10,
        textAlign: 'center',
        '&:hover $image': {
            opacity: 0.3,
        },
        '&:hover $removeButton': {
            opacity: 1,
        },
    },

    [`& .${classes.image}`]: {
        height: 100,
        width: 'initial',
        maxWidth: '100%',
        color: palette.text.primary,
        transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        boxSizing: 'border-box',
        boxShadow: 'rgba(0, 0, 0, 0.12) 0 1px 6px, rgba(0, 0, 0, 0.12) 0 1px 4px',
        borderRadius: shape.borderRadius,
        zIndex: 5,
        opacity: 1,
    },

    [`& .${classes.removeButton}`]: {
        transition: '.5s ease',
        position: 'absolute',
        opacity: 0,
        top: spacing(-1),
        right: spacing(-1),
        width: 40,
        height: 40,
        '&:focus': {
            opacity: 1,
        },
    },
}));

function PreviewList({
    fileObjects,
    handleRemove,
    showFileNames,
    useChipsForPreview,
    previewChipProps,
    previewGridClasses,
    previewGridProps,
    classes,
    getPreviewIcon,
}) {
    if (useChipsForPreview) {
        return (
            <StyledGrid
                spacing={1}
                direction="row"
                {...previewGridProps.container}
                container={true}
                className={clsx(classes.root, previewGridClasses.container)}
            >
                {fileObjects.map((fileObject, i) => {
                    return (
                        <Grid
                            {...previewGridProps.item}
                            key={`${fileObject.file?.name ?? 'file'}-${i}`}
                            className={classes.imageContainer}
                        >
                            <Chip
                                variant="outlined"
                                {...previewChipProps}
                                label={fileObject.file.name}
                                onDelete={handleRemove(i)}
                            />
                        </Grid>
                    );
                })}
            </StyledGrid>
        );
    }

    return (
        <Grid
            spacing={8}
            {...previewGridProps.container}
            container={true}
            className={clsx(classes.root, previewGridClasses.container)}
        >
            {fileObjects.map((fileObject, i) => {
                return (
                    <Grid
                        size={4}
                        {...previewGridProps.item}
                        key={`${fileObject.file?.name ?? 'file'}-${i}`}
                        className={clsx(classes.imageContainer, previewGridClasses.item)}
                    >
                        {getPreviewIcon(fileObject, classes)}

                        {showFileNames && (
                            <Typography variant="body1" component="p">
                                {fileObject.file.name}
                            </Typography>
                        )}

                        <Fab
                            onClick={handleRemove(i)}
                            aria-label="Delete"
                            className={classes.removeButton}
                        >
                            <DeleteIcon />
                        </Fab>
                    </Grid>
                );
            })}
        </Grid>
    );
}

PreviewList.propTypes = {
    classes: PropTypes.object.isRequired,
    fileObjects: PropTypes.arrayOf(PropTypes.object).isRequired,
    getPreviewIcon: PropTypes.func.isRequired,
    handleRemove: PropTypes.func.isRequired,
    previewChipProps: PropTypes.object,
    previewGridClasses: PropTypes.object,
    previewGridProps: PropTypes.object,
    showFileNames: PropTypes.bool,
    useChipsForPreview: PropTypes.bool,
};

export default (PreviewList);
