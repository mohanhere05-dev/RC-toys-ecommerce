import multer from "multer";
import path from "path";

// Storage Configuration
const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/products");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    },

});

// File Filter
const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpg|jpeg|png|webp/;

    const isValidExt = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const isValidMime = allowedTypes.test(file.mimetype);

    if (isValidExt && isValidMime) {

        cb(null, true);

    } else {

        cb(new Error("Only JPG, PNG and WEBP images are allowed"));

    }

};

const upload = multer({

    storage,

    fileFilter,

});

export default upload;