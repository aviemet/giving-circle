module FriendlyIdHistory
  extend ActiveSupport::Concern

  class_methods do
    def historical_slug_redirect_values(model_class, slug_param)
      before_action :handle_historical_slug_redirect

      define_method :handle_historical_slug_redirect do
        return unless params[slug_param]

        record = model_class.friendly.find(params[slug_param])

        # Let the controller decide if a redirect is needed
        if should_redirect_for_historical_slug?(record, slug_param)
          redirect_to current_record_path(record), status: :moved_permanently
        end
      end
    end
  end

  private

  def should_redirect_for_historical_slug?(record, slug_param)
    # Default implementation - controllers can override
    params[slug_param] != record.slug
  end

  def current_record_path(record)
    # Try to generate the path by recognizing the current request and updating the slug

    recognized = Rails.application.routes.recognize_path(request.path)
    recognized[:slug] = record.slug
    url_for(recognized)
  rescue ActionController::RoutingError
    # Fallback to polymorphic_path if recognition fails
    polymorphic_path(record)
  end
end
