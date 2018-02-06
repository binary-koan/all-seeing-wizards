module ActiveRecordSpecSupport
  def active_record_double(type, **setup)
    double = instance_double(type, **setup)

    # setup.each do |name, value|
    #   if value.is_a?(Hash) && (association_type = check_for_association(type, name, value))
    #     allow(double).to receive(name).and_return(active_record_double(association_type, value))
    #   else
    #     allow(double).to receive(name).and_return(value)
    #   end
    # end

    allow(double).to receive(:transaction) do |&block|
      block.call
    end

    double
  end

  # private

  # def check_for_association(type, name, value)
  #   type.reflections[name.to_s]&.association_class
  # end
end
