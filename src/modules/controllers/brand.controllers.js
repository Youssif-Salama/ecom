import { AppError, catchASyncError } from "../../utils/error.handler.js";
import { brandModel } from "../models/brand.model.js";

export const getBrand = catchASyncError(async (req, res) => {
    const { brandSlug } = req.params;
    const result = await brandModel.findOne({ slug: brandSlug });
    if (!result) throw new AppError(400, "cannot find brand");
    res.json(200, { message: "success", result });
})

export const addBrand = catchASyncError(async (req, res) => {
    const result = await brandModel.create(req.body);
    if (!result) throw new AppError(400, "cannot find brands");
    res.json(201, { message: "success", result });
})

export const updateBrand = catchASyncError(async (req, res) => {
    const { brandSlug } = req.params;
    const result = await brandModel.findOneAndUpdate({ slug: brandSlug }, req.body, { new: true });
    if (!result) throw new AppError(400, "cannot find brands");
    res.json(200, { message: "success", result });
})

export const deleteBrand = catchASyncError(async (req, res) => {
    const { brandSlug } = req.params;
    const result = await brandModel.findOneAndDelete({ slug: brandSlug }, { new: true });
    if (!result) throw new AppError(400, "cannot find brands");
    res.json(200, { message: "success", result });
})