class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # Add .render method to ActiveRecord objects. Located in app/lib/renderable
  include Renderable

  self.implicit_order_column = "created_at"
end
