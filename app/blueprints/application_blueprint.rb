class ApplicationBlueprint < Blueprinter::Base
  identifier :id

  # field :uid do |model|
  #   model.encode_id unless model&.id.nil?
  # end

  view :new do
    excludes :id, :created_by_id, :updated_at, :created_at
  end

  view :edit do
    excludes :updated_at, :created_at
  end

  view :show do
    include_view :associations
  end

  view :index do
    include_view :associations
  end

  def self.field(method, options = {}, &)
    unexclude(method)
    super
  end

  def self.currency_for(obj)
    obj&.cost&.amount&.to_f unless obj.cost.nil?
  end

  def self.unexclude(field_name)
    current_view.excluded_field_names.delete field_name
  end

  def self.only(*fields)
    all_fields = view_collection[:default].fields.keys.filter{ |f| !fields.include? f }
    excludes(*all_fields.filter{ |f| !fields.include? f })
    fields(*fields)
  end
end
