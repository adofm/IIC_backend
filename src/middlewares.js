import { z } from "zod";

const adminSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email format"),
    number: z.string().regex(/^\d+$/, "Number must contain only digits")
});

function sanityCheck(req, res, next) {
    const { username, password, email, number } = req.bod;

    const validationResult = adminSchema.safeParse({ username, password, email, number });

    if (!validationResult.success) {
        return res.status(400).json({
            msg: "Validation error",
            errors: validationResult.error.errors
        });
    }
    next();
}

export default sanityCheck;
// done as of now
