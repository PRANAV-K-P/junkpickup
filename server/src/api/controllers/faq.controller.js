const asyncHandler = require('express-async-handler');
const faqService = require('../services/faq');

// @desc create a faq
// @route POST /api/faqs
// @access private
const createFaq = asyncHandler(async (req, res) => {
    const { question, answer } = req.body;
    if (!question || !answer) {
      res.status(400);
      throw new Error('All fields are mandatory');
    }
    const faqExist = await faqService.faqExist(question);
    if (faqExist) {
      res.status(400);
      throw new Error('faq already created');
    }
    const faq = await faqService.addFaq(question, answer);
    if (faq) {
      res.status(201).json(faq);
    } else {
      res.status(400);
      throw new Error('faq is not valid');
    }
  });

// @desc get all faq
// @route GET /api/faqs/admin
// @access private
const getFaq = asyncHandler(async (req, res) => {
    const faq = await faqService.getFaq();
    if(faq) {
        res.status(200).json(faq);
    } else {
        res.status(404);
        throw new Error("Faq not found");
    }
})

// @desc delete faq
// @route DELETE /api/faqs/:id
// @access private
const deleteFaq = asyncHandler(async (req, res) => {
    const faqId = req.params.id;
    if(!faqId) {
        res.status(400);
        throw new Error("FaqId is mandatory");
    }
    const faq = await faqService.deleteFaq(faqId);
    if(faq) {
        res.status(200).json(faq);
    } else {
        res.status(404);
        throw new Error("Faq data not found")
    }
})

// @desc get single faq
// @route GET /api/faqs/:id
// @access private
const getSingleFaq = asyncHandler(async (req, res) => {
    const faqId = req.params.id;
    const faq = await faqService.getSingleFaq(faqId);
    if(faq) {
        res.status(200).json(faq);
    } else {
        res.status(404);
        throw new Error("Faq not found")
    }
})

// @desc update faq
// @route PUT /api/faqs/:id
// @access private
const updateFaq = asyncHandler(async (req, res) => {
    const faqId = req.params.id;
    const {question, answer} = req.body;
    if(!faqId || !question || !answer) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const faq = await faqService.updateFaq(faqId, req.body);
    if(faq) {
        res.status(200).json(faq);
    } else {
        res.status(404);
        throw new Error("Faq not found")
    }
})

// @desc get faq user
// @route GET /api/faqs/user
// @access public
const UserGetFaq = asyncHandler(async (req, res) => {
    const faq = await faqService.getFaq();
    if(faq) {
        res.status(200).json(faq);
    } else {
        res.status(404);
        throw new Error("Faq not found");
    }
})

module.exports = {createFaq, getFaq, deleteFaq, getSingleFaq, updateFaq, UserGetFaq}