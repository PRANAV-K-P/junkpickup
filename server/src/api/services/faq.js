const Faq = require('../models/faq.model');

module.exports = {
  addFaq: async (question, answer) => {
    const faq = await Faq.create({
      question,
      answer,
    });
    if (faq) {
      return faq;
    }
    return false;
  },
  faqExist: async (question) => {
    const faqAvailable = await Faq.findOne({ question });
    if(faqAvailable) {
        return faqAvailable
    }
    return false;
  },
  getFaq: async () => {
    const faqs = await Faq.find();
    if (faqs) {
      return faqs;
    }
    return false;
  },
  updateFaq: async (faqId,faqData) => {
    let response = await Faq.findOneAndUpdate(
        { _id: faqId },
        {
          question: faqData.question,
          answer: faqData.answer,
        },
        {
          new: true,
          fields: {
            question: 1,
            answer: 1,
          },
        },
      );
      if(response) {
        return response;
      }
      return false;
  },
  deleteFaq: async (faqId) => {
    let response = await Faq.deleteOne({ _id: faqId});
    if(response) {
        return response;
    }
    return false;
  },
  getSingleFaq: async (faqId) => {
    const faq = await Faq.findOne({_id: faqId});
    if(faq) {
      return faq;
    }
    return false;
  }
};
