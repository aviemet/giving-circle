module ActiveRecordExtensions
  def blueprint
    "#{self.name}Blueprint".constantize
  end

  def render(**args)
    self.blueprint.render_as_json(self, **args)
  end
end

ActiveRecord::Relation.include ActiveRecordExtensions
