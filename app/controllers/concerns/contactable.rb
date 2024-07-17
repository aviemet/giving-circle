module Contactable
  extend ActiveSupport::Concern

  def contact_attributes
    {
      contact_attributes: Contact.attribute_names.map(&:to_sym)
        .push(emails: Email.attribute_names.map(&:to_sym))
        .push(phones: Phone.attribute_names.map(&:to_sym))
    }
  end
end
