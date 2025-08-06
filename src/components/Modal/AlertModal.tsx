import { Modal, Box, Typography, Button } from "@mui/material";
import { type FC, type ReactNode } from "react";

type AlertModalProps = {
    open: boolean;
    title?: ReactNode;
    message: string | ReactNode;
    onClose: () => void;
    buttonText?: string;
    backgroundColor?: string;
    textColor?: string;
};

const AlertModal: FC<AlertModalProps> = ({
    open,
    title = <i className="bi bi-exclamation-triangle-fill text-lg bg-yellow-500"/>,
    message,
    onClose,
    buttonText = "OK",
    backgroundColor = "#1e293b", // default dark background
    textColor = "#f1f5f9",       // default light text
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="alert-modal-title"
            aria-describedby="alert-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 340,
                    bgcolor: backgroundColor,
                    color: textColor,
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center",
                }}
            >
                {title && (
                    <Typography
                        id="alert-modal-title"
                        variant="h6"
                        component="h2"
                        gutterBottom
                    >
                        {title}
                    </Typography>
                )}
                <Typography id="alert-modal-description" sx={{ mb: 3 }}>
                    {message}
                </Typography>
                <Button variant="contained" color="primary" onClick={onClose}>
                    {buttonText}
                </Button>
            </Box>
        </Modal>
    );
};

export default AlertModal;
