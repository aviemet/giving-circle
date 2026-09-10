class Presentation::InteractionPolicy < ApplicationPolicy

  class Scope < ApplicationPolicy::Scope
  end

  def open_responses?
    update?
  end

  def close_responses?
    update?
  end

  def edit_member_ui?
    update?
  end
end
