import { Modal, Box, Typography, Button } from "@mui/material";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

type ModalProps = {
    score: number;
    showModal: boolean;
    handleClose: any;
}

const SuccessModal: FC<ModalProps> = ({ score, showModal, handleClose }) => {
    const { t } = useTranslation();
    return (
        <Modal
            open={showModal}
            onClose={handleClose}
            aria-labelledby="completion-modal-title"
            aria-describedby="completion-modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 340,
                    bgcolor: "#0f172a", // dark slate background
                    color: "#f8fafc", // light text
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                    textAlign: "center",
                }}
            >
                <Typography id="completion-modal-title" variant="h5" component="h2" gutterBottom>
                    {t("Messages.congratulations")}
                </Typography>
                <Typography id="completion-modal-description" sx={{ mb: 2 }}>
                    {t("Messages.levelSuccess")}
                </Typography>
                <Typography variant="h6" sx={{ mb: 3 }}>
                    {t("Messages.score")} {score}
                </Typography>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleClose}
                >
                    {t("Messages.gratsBtn")}
                </Button>
            </Box>
        </Modal>
    )
}

export default SuccessModal;