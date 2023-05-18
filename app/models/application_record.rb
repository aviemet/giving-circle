class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  # app/lib/renderable
  include Renderable

  include PublicActivity::Model
  tracked owner: proc{ |controller, _model| controller&.current_user || nil }
end
