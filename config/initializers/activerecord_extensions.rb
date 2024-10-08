require_relative '../../lib/renderable'

module ActiveRecordExtensions
  extend ActiveSupport::Concern

  included do
    include Renderable::ClassMethods
  end
end

ActiveRecord::Relation.include ActiveRecordExtensions
