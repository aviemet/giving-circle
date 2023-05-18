class MembersController < ApplicationController
  include Searchable

  expose :members, -> { search(@active_company.members.includes_associated, sortable_fields) }
    expose :member, scope: ->{ @active_company.members }, find: ->(id, scope){ scope.includes_associated.find(id) }
  
  # GET /members
  def index
    authorize members
    render inertia: "Member/Index", props: {
      members: -> { members.render(view: :index) }
    }
  end

  # GET /members/:id
  def show
    authorize member
    render inertia: "Member/Show", props: {
      member: -> { member.render(view: :show) }
    }
  end

  # GET /members/new
  def new
    authorize Member.new
    render inertia: "Member/New", props: {
      member: Member.new.render(view: :form_data)
    }
  end

  # GET /members/:id/edit
  def edit
    authorize member
    render inertia: "Member/Edit", props: {
      member: member.render(view: :edit)
    }
  end

  # POST /members
  def create
    authorize Member.new
    if member.save
      redirect_to member, notice: "Member was successfully created."
    else
      redirect_to new_member_path, inertia: { errors: member.errors }
    end
  end

  # PATCH/PUT /members/:id
  def update
    authorize member
    if member.update(member_params)
      redirect_to member, notice: "Member was successfully updated."
    else
      redirect_to edit_member_path, inertia: { errors: member.errors }
    end
  end

  # DELETE /members/:id
  def destroy
    authorize member
    member.destroy
    redirect_to members_url, notice: "Member was successfully destroyed."
  end

  private

  def sortable_fields
    %w(first_name last_name number).freeze
  end

  def member_params
    params.require(:member).permit(:first_name, :last_name, :number)
  end
end
