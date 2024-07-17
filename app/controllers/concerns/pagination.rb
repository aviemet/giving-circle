require 'active_support/concern'

module Pagination
  extend ActiveSupport::Concern

  included do
    before_action :remove_empty_query_parameters

    def pagination_data(model)
      return if !model.respond_to? :total_pages

      {
        pages: model.total_pages,
        limit: model.limit_value,
        current_page: model.current_page,
        next_page: model.next_page,
        prev_page: model.prev_page,
        is_first_page: model.first_page?,
        is_last_page: model.last_page?
      }
    end
  end

  private

  def remove_empty_query_parameters
    # Filter out empty query parameters
    non_empty_params = request.query_parameters.compact_blank

    # Remove direction param if table is not sorted
    if non_empty_params['direction'].present? && non_empty_params['sort'].blank?
      non_empty_params.delete('direction')
    end

    return unless request.query_parameters.keys.length > non_empty_params.keys.length

    # Rebuild the URL without empty query parameters
    new_url = "#{request.path}?#{non_empty_params.to_param}"
    redirect_to new_url
  end
end
