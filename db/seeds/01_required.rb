if ActiveRecord::Base.connection.table_exists?(:categories)
  Category::CATEGORIZABLE_TYPES.each do |categorizable_type|
    %w[Home Work Other].each do |name|
      Category.find_or_create_by!(categorizable_type:, name:)
    end
  end
end
